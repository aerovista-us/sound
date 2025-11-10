# Order Consolidation Guide

## Problem

When customers add multiple items to their cart, we want to process them as **ONE single order** instead of multiple separate orders. This provides:

- ✅ Single shipping charge (not per item)
- ✅ Single tracking number
- ✅ Easier order management
- ✅ Better customer experience
- ✅ Lower shipping costs

## Solution

The checkout system now consolidates all cart items into a single order.

## How It Works

### Frontend (Current Implementation)

1. **Cart Collection**: All items are collected in a single `cart` array
2. **Checkout**: When proceeding to checkout, all items are sent together
3. **Single Payment**: One Square payment is processed for the total amount
4. **Order Data**: All items are grouped in one order object

### Backend Implementation (Required)

Your backend should receive the order data and:

#### 1. Process Square Payment

```javascript
// Single payment for total amount
const payment = await square.paymentsApi.createPayment({
  sourceId: orderData.sourceId,
  amountMoney: {
    amount: orderData.amount, // Total in cents
    currency: 'USD'
  },
  idempotencyKey: crypto.randomUUID(),
  referenceId: orderData.orderNumber
});
```

#### 2. Create Printful Order (Physical Items)

```javascript
if (orderData.physicalItemCount > 0) {
  // Group all physical items into ONE Printful order
  const printfulOrder = await printful.createOrder({
    recipient: {
      name: orderData.shipping.name,
      address1: orderData.shipping.address,
      city: orderData.shipping.city,
      state_code: orderData.shipping.state,
      country_code: orderData.shipping.country,
      zip: orderData.shipping.zip
    },
    items: orderData.items
      .filter(item => item.type === 'printful')
      .map(item => ({
        variant_id: item.printfulVariantId,
        quantity: 1,
        // Include size, color, etc. from item.variant
      })),
    // This creates ONE order with all physical items
    // Printful will provide ONE tracking number
  });
  
  // Store tracking number
  const trackingNumber = printfulOrder.shipments[0].tracking_number;
}
```

#### 3. Handle Digital Items

```javascript
if (orderData.digitalItemCount > 0) {
  const digitalItems = orderData.items.filter(item => item.type === 'digital');
  
  // Generate secure download links
  const downloadLinks = digitalItems.map(item => ({
    itemId: item.itemId,
    title: item.title,
    downloadUrl: generateSecureDownloadLink(item.itemId, orderData.email)
  }));
}
```

#### 4. Send Confirmation Email

```javascript
await sendOrderConfirmation({
  email: orderData.email,
  orderNumber: orderData.orderNumber,
  items: orderData.items, // All items listed
  total: orderData.amount / 100,
  trackingNumber: trackingNumber, // Single tracking for all physical items
  downloadLinks: downloadLinks // All digital downloads
});
```

## Order Structure

The frontend sends this structure:

```javascript
{
  sourceId: "square_payment_token",
  amount: 15000, // Total in cents ($150.00)
  email: "customer@example.com",
  items: [
    {
      id: "item-1",
      itemId: "av-effect-tee",
      title: "AeroVista Effect Tee",
      price: 29.99,
      type: "printful",
      size: "L",
      color: "black",
      variant: "L / black",
      printfulVariantId: "VARIANT_ID"
    },
    {
      id: "item-2",
      itemId: "lines-power-hoodie",
      title: "Lines of Power Hoodie",
      price: 49.99,
      type: "printful",
      size: "M",
      color: "navy",
      variant: "M / navy",
      printfulVariantId: "VARIANT_ID"
    },
    {
      id: "item-3",
      itemId: "album-digital",
      title: "Full Album Download",
      price: 9.99,
      type: "digital"
    }
  ],
  shipping: {
    name: "John Doe",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States"
  },
  orderNumber: "AV-1234567890",
  itemCount: 3,
  physicalItemCount: 2,
  digitalItemCount: 1
}
```

## Benefits

### Single Order Processing
- ✅ One Square payment transaction
- ✅ One Printful order (all physical items together)
- ✅ One tracking number
- ✅ One confirmation email
- ✅ One order number for customer reference

### Cost Savings
- ✅ Single shipping charge instead of per-item
- ✅ Better shipping rates (bulk shipping)
- ✅ Lower transaction fees

### Customer Experience
- ✅ Easier to track (one tracking number)
- ✅ Single confirmation email
- ✅ Clear order summary
- ✅ Better organization

## Shipping Calculation

In production, calculate shipping based on:
- Number of physical items
- Total weight
- Shipping destination
- Shipping method selected

Example:
```javascript
function calculateShipping(physicalItems, shippingAddress) {
  // Calculate based on:
  // - Item count and weight
  // - Destination
  // - Shipping method
  // Return shipping cost
}
```

## Order Tracking

Store order information in your database:

```javascript
{
  orderNumber: "AV-1234567890",
  email: "customer@example.com",
  items: [...],
  total: 150.00,
  shipping: {...},
  squarePaymentId: "...",
  printfulOrderId: "...",
  trackingNumber: "...",
  status: "processing",
  createdAt: "..."
}
```

## Error Handling

If payment succeeds but Printful order fails:
1. Refund the Square payment
2. Notify customer
3. Log error for manual processing

If Printful order succeeds but email fails:
1. Order is still valid
2. Retry email sending
3. Customer can contact support for order details

## Testing

Test scenarios:
1. ✅ Single physical item
2. ✅ Multiple physical items
3. ✅ Single digital item
4. ✅ Multiple digital items
5. ✅ Mixed physical + digital items
6. ✅ Large orders (10+ items)

## Next Steps

1. Implement backend `/api/create-order` endpoint
2. Integrate Square payment processing
3. Integrate Printful order creation
4. Set up email service
5. Test with real orders
6. Monitor order processing

