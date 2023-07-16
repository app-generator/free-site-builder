# [Rocket Builder](https://rocket-builder.onrender.com/) `Free DnD Tool`

**STATUS**: `Work in Progress` - Website builder that uses **Vanilla JS** and a **[Remote Server](https://components-server.onrender.com/kits/)** for components injection - Actively supported by [AppSeed](https://appseed.us/).

- 👉 [Rocket Builder](https://rocket-builder.onrender.com/) - `Live DEMO`
- 👉 [FULL Specs](https://docs.google.com/document/d/1YbmZro0b8ucMGE227xSMzcQGNbWgTaiOKfjgEW9RsWE/edit?usp=sharing), `Google Drive Link`
- 🫶 **Contribute** - see the [open issues](https://github.com/app-generator/rocket-builder/issues)  

![Rocket Builder - Open-Source DnD project crafted by AppSeed.](https://github.com/app-generator/rocket-builder/assets/51070104/b3be1e3d-a733-4aac-b938-5402e840553d)

## Roadmap & `Features` 

| Status | Item | info | 
| --- | --- | --- |
| ✅ | **Core** |  `Vanilla JS` |
| ✅ | **Components** | `Bootstrap 5` |
| ✅ | **Remote Components Server** | https://components-server.onrender.com/kits/ |
| ✅ | **Persistence** (local storage) | Save, Restore, Clear |
| ✅ | **One-Page Layout** | `Single Component` Drag & Drop |
| ✅ | **Component Customization** | Text-Only |
| ✅ | **Grid Components** | This allows to inject predefined rows (2,3,4 columns) |
| ✅ | **USE Remote Components** | `Yes` |
| ✅ | **Component Customization** | Texts, Links |
| ❌ | **Component Customization** | Links |
| ❌ | **Component Customization** | CSS |
| ❌ | **PAGE Customization** | CSS |
| ❌ | **PAGE Customization** | JS |
| ❌ | **Manage SEO** | Title, Description, Keywords |
| ❌ | **Handle Multiple Pages** | - |
| ❌ | **Dashboard Layout** | `Multiple Components` Drag & Drop |

<br />

## `Compile Builder`

> Tested with `Node 16.x, 18.x`.
 
```bash
$ git clone https://github.com/app-generator/rocket-builder.git
$ cd rocket-builder/builder
$ yarn
$ yarn dev    # development (LIVE Reload)
$ yarn build  # production  (dist FOLDER)
```

<br />

## Components Server

> Managed by `Flask` (optional). By default, a **[LIVE Components Server](https://components-server.onrender.com/kits/)** is used.

```bash
$ cd rocket-builder/builder
$ virtualenv env
$ source env/bin/activate
$ pip install -r requirements.txt
$ flask run --debug
```

Here is the output:

- `http://localhost:5000/`
- `http://localhost:5000/kits/`, returns available KITS
  - 'material-kit'
  - 'kit2'
- `http://localhost:5000/kits/material-kit/`, return `Material Kit` assets

```json
{
    "name": "Material Kit BS5 ",
    "version": "0.0.0",
    "type": "kit",
    "material-kit": {
        "layouts": "base.html",
        "components": {
            "footers": {
                "footer.html": "NA"
            },
            "headers": {
                "header.html": "NA"
            },
            "navigation": {
                "navigation.html": "NA"
            },
            "general": {
                "section1.html": "NA"
            }
        }
    }
}
```

<br />

## License

[EULA License](./LICENSE.md)

For more information regarding licensing, please contact the [AppSeed](http://appseed.us/) Service < *support@appseed.us* >.

<br />

---
[Rocket Builder](https://rocket-builder.onrender.com/) `Free DnD Tool` - DnD Builder provided by **[AppSeed](https://appseed.us/)**.
