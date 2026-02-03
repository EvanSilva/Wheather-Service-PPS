# Weather App

Una aplicación CLI del tiempo con CI/CD completo usando GitHub Actions.

## 🚀 Estado del proyecto

![CI Tests](https://github.com/EvanSilva/weather-app-ci/workflows/CI%20-%20Tests/badge.svg)
![Release](https://github.com/EvanSilva/weather-app-ci/workflows/Release%20%26%20Build/badge.svg)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/EvanSilva/weather-app-ci)
![GitHub](https://img.shields.io/github/license/EvanSilva/weather-app-ci)

## 📦 Instalación

### Descargar ejecutable

Ve a [Releases](https://github.com/EvanSilva/weather-app-ci/releases) y descarga el ejecutable para tu sistema operativo:

- **Linux (x64)**: `weather-linux`
- **macOS Intel (x64)**: `weather-macos-x64`
- **macOS Apple Silicon (ARM)**: `weather-macos-arm64`
- **Windows (x64)**: `weather-win.exe`

> **💡 Usuarios de macOS:** Si no sabes qué versión usar, ejecuta `uname -m` en terminal:
>
> - `arm64` → Usa `weather-macos-arm64` (M1/M2/M3)
> - `x86_64` → Usa `weather-macos-x64` (Intel)

### Linux

```bash
# Dar permisos de ejecución
chmod +x weather-linux

# Ejecutar
./weather-linux Madrid
```

### macOS

```bash
# Dar permisos de ejecución
chmod +x weather-macos-arm64  # o weather-macos-x64

# Ejecutar
./weather-macos-arm64 Madrid
```

### Windows

```cmd
weather-win.exe Madrid
```

## 🧪 Desarrollo

### Requisitos

- Node.js 20.x o superior
- npm

### Setup local

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Ejecutar con cobertura
npm run test:coverage

# Ejecutar la aplicación
npm start

# Lint
npm run lint

# Build local
npm run build
```

## 🔄 CI/CD Pipeline

Este proyecto usa GitHub Actions para:

1. **Continuous Integration**: Tests automáticos en cada push
2. **Continuous Delivery**: Build multi-plataforma en cada release
3. **Automated Releases**: Generación automática de ejecutables

### Workflow de desarrollo

1. Hacer cambios en una rama
2. Crear Pull Request
3. Los tests se ejecutan automáticamente
4. Merge a main cuando los tests pasen
5. Crear tag para nueva versión
6. Release automática con ejecutables

## 📝 Versionado

Usamos [Semantic Versioning](https://semver.org/):

- `v1.0.0`: Primera versión estable
- `v1.1.0`: Nueva funcionalidad
- `v1.0.1`: Corrección de bugs
- `v2.0.0`: Cambios incompatibles

## 🛠️ Tecnologías

- Node.js 20
- Jest (testing)
- ESLint (linting)
- pkg (empaquetado)
- GitHub Actions (CI/CD)

## 📄 Licencia

MIT

## 👤 Autor

Tu nombre
