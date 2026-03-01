# OGPix API Documentation

Welcome to the OGPix API documentation! This guide will help you quickly integrate dynamic Open Graph (OG) image generation into your applications. With OGPix, you can create stunning, on-brand social share images on-the-fly with a single API request.

---

## 1. Authentication

Access to the OGPix API is secured using a simple API key. You can get your free API key from the [OGPix homepage](https://ogpix-mu.vercel.app/#get-key).

Include your API key in the `Authorization` header of every request:

```
Authorization: Bearer YOUR_API_KEY
```

If you do not provide a valid API key, your request will be rejected with a `401 Unauthorized` error.

---

## 2. API Endpoint

All image generation requests are sent to a single `POST` endpoint:

`POST https://ogpix-mu.vercel.app/api/generate`

### Request Headers

-   `Authorization: Bearer YOUR_API_KEY` (Required)
-   `Content-Type: application/json` (Required)

### Request Body (JSON)

The request body is a JSON object containing the parameters for your OG image. All parameters are case-sensitive.

| Parameter     | Type                          | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------ | :---------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `template`    | `string` (enum)               | Yes      | The name of the template to use. Available templates can be found in the [Template Gallery](https://ogpix-mu.vercel.app/templates). Examples: `blog`, `product`, `social`, `minimal`, `gradient`, `changelog`, `docs`, `tweet`, `profile`, `event`, `podcast`, `pricing`, `newsletter`, `comparison`, `announcement`.                                                                                                                                                                             |
| `title`       | `string`                      | Yes      | The main title text for your OG image. This will be prominently displayed on the image. Max 80 characters.                                                                                                                                                                                                                                                                                                                                                                                                             |
| `description` | `string` (optional)           | No       | A secondary description or tagline for your OG image. Max 160 characters.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `theme`       | `'light' \| 'dark'` (optional) | No       | Sets the overall color theme of the image. Defaults to `dark` if not provided.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `brand_color` | `string` (hex code, optional) | No       | A hex color code (e.g., `#6366f1`) to customize the brand accent color used in some templates. If not provided, a default brand color will be used. Must be a valid 6-digit hex code (e.g., `#RRGGBB`).                                                                                                                                                                                                                                                                                                                   |

### Response

The API will return the generated OG image directly as a `image/png` binary stream.

Possible HTTP Status Codes:
-   `200 OK`: Image successfully generated and returned.
-   `400 Bad Request`: Missing required parameters or invalid parameter values.
-   `401 Unauthorized`: Invalid or missing API key.
-   `429 Too Many Requests`: Rate limit exceeded.
-   `500 Internal Server Error`: An unexpected error occurred on the server.

---

## 3. Code Examples

### cURL

```bash
curl -X POST https://ogpix-mu.vercel.app/api/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "template": "blog",
    "title": "My Amazing Post",
    "description": "A description of my post",
    "theme": "dark",
    "brand_color": "#6366f1"
  }' --output image.png
```

### JavaScript (Node.js / Browser Fetch API)

```javascript
const response = await fetch('https://ogpix-mu.vercel.app/api/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    template: 'blog',
    title: 'My Amazing Post',
    description: 'A description of my post',
    theme: 'dark',
    brand_color: '#6366f1',
  }),
});

// If you want to display the image in the browser:
const blob = await response.blob();
const imageUrl = URL.createObjectURL(blob);
// document.getElementById('myImage').src = imageUrl;
```

### Python

```python
import requests

response = requests.post(
    'https://ogpix-mu.vercel.app/api/generate',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
    },
    json={
        'template': 'blog',
        'title': 'My Amazing Post',
        'description': 'A description of my post',
        'theme': 'dark',
        'brand_color': '#6366f1',
    }
)

# Save the image to a file
with open('image.png', 'wb') as f:
    f.write(response.content)

# Or, if you want to display it (e.g., in a web framework, though usually you'd serve the URL)
# from IPython.display import Image, display
# display(Image(response.content))
```

---

## 4. Template Gallery

Explore all available templates and see live examples in our [Template Gallery](https://ogpix-mu.vercel.app/templates).

---

## 5. Changelog

View recent updates and changes to the OGPix API and templates [here](https://ogpix-mu.vercel.app/changelog). (Note: `changelog` template is available, but a dedicated changelog page doesn't exist yet).

---

## 6. Support

For any questions or issues, please contact us at [support@ogpix.dev](mailto:support@ogpix.dev). (Note: This email is a placeholder and does not function yet).
