# AeroVista Store Setup Guide

## Overview

The store prototype (`index.html`) integrates Square checkout for payments and supports both Printful products (clothing/merchandise) and digital downloads.

## Features

- 🛍️ **Tabbed Interface**: Switch between Playlist and Shop
- 💳 **Square Checkout**: Secure payment processing
- 👕 **Printful Integration**: Support for physical products
- 💾 **Digital Downloads**: Support for digital products
- 🎵 **Track Association**: Items can be linked to specific tracks
- 📱 **Responsive Design**: Works on all devices

## Setup Instructions

### 1. Square Setup

1. **Create a Square Account**
   - Go to [squareup.com](https://squareup.com) and create an account
   - Complete the business verification process

2. **Get Your Application ID**
   - Go to [Square Developer Dashboard](https://developer.squareup.com/apps)
   - Create a new application or use an existing one
   - Copy your **Application ID** (starts with `sandbox-sq0idb-` for sandbox or `sq0idb-` for production)

3. **Get Your Location ID**
   - In Square Dashboard, go to **Locations**
   - Copy your **Location ID**

4. **Update Configuration**
   - Open `index.html`
   - Find these lines near the top of the `<script>` section:
   ```javascript
   const SQUARE_APPLICATION_ID = 'sandbox-sq0idb-XXXXXXXXXXXX';
   const SQUARE_LOCATION_ID = 'XXXXXXXXXXXXX';
   ```
   - Replace with your actual IDs

### 2. Printful Setup

1. **Create Printful Account**
   - Go to [printful.com](https://www.printful.com) and create an account
   - Set up your store and products

2. **Get Product Variant IDs**
   - In Printful Dashboard, go to **Products**
   - For each product, note the **Variant ID**
   - Update the `storeItems` array in `index.html`:
   ```javascript
   {
     id: 'av-effect-tee',
     title: 'AeroVista Effect Tee',
     type: 'printful',
     price: 29.99,
     printfulVariantId: 'YOUR_VARIANT_ID_HERE', // Replace this
     // ...
   }
   ```

3. **Webhook Setup (Optional)**
   - Set up Printful webhooks to receive order updates
   - Configure webhook endpoint in your backend (if you have one)

### 3. Backend Integration (Required for Production)

The current prototype simulates payment processing. For production, you need:

1. **Backend Server**
   - Create a server endpoint to handle Square payment processing
   - Example endpoint: `POST /api/create-payment`

2. **Payment Flow**
   - Frontend sends payment token to your backend
   - Backend creates payment using Square API
   - Backend handles Printful order creation (if physical product)
   - Backend sends confirmation email with download link (if digital)

3. **Example Backend Code Structure**
   ```javascript
   // POST /api/create-payment
   app.post('/api/create-payment', async (req, res) => {
     const { sourceId, amount, email, itemId, itemType } = req.body;
     
     // 1. Process payment with Square
     const paymentResult = await square.paymentsApi.createPayment({
       sourceId: sourceId,
       amountMoney: { amount: amount, currency: 'USD' },
       idempotencyKey: crypto.randomUUID()
     });
     
     // 2. If physical product, create Printful order
     if (itemType === 'printful') {
       await createPrintfulOrder(itemId, email);
     }
     
     // 3. If digital, generate download link
     if (itemType === 'digital') {
       const downloadLink = generateSecureDownloadLink(itemId, email);
       await sendDownloadEmail(email, downloadLink);
     }
     
     res.json({ success: true });
   });
   ```

### 4. Digital Downloads Setup

1. **Upload Files**
   - Upload your digital files (MP3, FLAC, etc.) to a secure location
   - Consider using cloud storage (AWS S3, Google Cloud, etc.)

2. **Generate Secure Links**
   - Create time-limited, signed URLs for downloads
   - Update `downloadUrl` in `storeItems` array

3. **Email Delivery**
   - Set up email service (SendGrid, Mailgun, etc.)
   - Send download links after successful payment

## Store Items Configuration

Edit the `storeItems` array in `index.html`:

```javascript
const storeItems = [
  {
    id: 'unique-item-id',           // Unique identifier
    title: 'Product Name',          // Display name
    type: 'printful',               // 'printful' or 'digital'
    price: 29.99,                   // Price in USD
    image: 'art/product_art.png',   // Image path
    description: 'Product description',
    printfulVariantId: 'VARIANT_ID', // For Printful products
    downloadUrl: '#',                // For digital products
    trackKey: 'track_key'           // Optional: link to track
  }
];
```

## Testing

### Square Sandbox Testing

1. Use Square sandbox credentials for testing
2. Use test card numbers from [Square Testing Guide](https://developer.squareup.com/docs/testing-guide)
   - **Success**: `4111 1111 1111 1111`
   - **Decline**: `4000 0000 0000 0002`
   - Use any future expiry date and any CVV

### Printful Testing

1. Use Printful's test mode
2. Test orders won't be fulfilled
3. Verify webhook integration

## Security Considerations

1. **Never expose Square API keys in frontend code**
   - Only Application ID should be in frontend
   - Secret keys must stay on backend

2. **Validate all payments server-side**
   - Don't trust frontend payment data
   - Always verify with Square API

3. **Secure download links**
   - Use time-limited, signed URLs
   - Verify payment before providing download

4. **HTTPS Required**
   - Square requires HTTPS in production
   - Use SSL certificate

## Customization

### Styling
- All styles are in the `<style>` section
- Colors use CSS variables (see `:root`)
- Match your brand colors

### Store Layout
- Grid layout is responsive
- Adjust `grid-template-columns` in `.store-grid` CSS
- Modify item card structure in `renderStore()` function

### Checkout Flow
- Customize modal in HTML
- Modify payment form in `#payment-form`
- Add additional fields as needed

## Next Steps

1. ✅ Set up Square account and get credentials
2. ✅ Set up Printful account and get variant IDs
3. ✅ Update configuration in `index.html`
4. ✅ Create backend server for payment processing
5. ✅ Test with Square sandbox
6. ✅ Set up production environment
7. ✅ Deploy and go live!

## Support

- [Square Developer Docs](https://developer.squareup.com/docs)
- [Printful API Docs](https://developers.printful.com/)
- [Square Testing Guide](https://developer.squareup.com/docs/testing-guide)

