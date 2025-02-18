# v2-component-lib

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat.

## Installation

```bash
npm install @YOUR_NPM_USERNAME/v2-component-lib
```

## Usage

```usage
<v2-converter></v2-converter>
<v2-button></v2-button>
<v2-button label="Kick Me" danger></v2-button>
```

## Example

```example
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>V2 Component Library Example</title>

    <style>
        html, body {
            height: 100%;
        }
        .example {
            --width: 30vw;
            --height: 30vh;
        }
    </style>

    <script type="module" src="https://unpkg.com/@YOUR_NPM_USERNAME/v2-component-lib"></script>
</head>
<body>
    <v2-converter></v2-converter>
    <v2-button>Primary</v2-button>
    <v2-button danger onclick="v2-click">Danger</v2-button>
    <v2-button loading class="example">Loading...</v2-button>
</body>
</html>

```

## Classes

```classes
V2Converter, V2Button
```

### V2Button
#### CSS Variables

```V2Button cssvars
--v2-button-font-size: 1rem;
```

#### Properties

```V2Button props
label = 'Click me';
variant: 'primary' | 'secondary' | 'danger' = 'primary';
disabled = false;
loading = false;
```

#### Dispatches

```dispatches
v2-clicked
```

## License

This project is licensed under the [MIT License](https://github.com/Version2Software/v2-timer-component/blob/main/LICENSE).
