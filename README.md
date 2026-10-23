# myTestRestfulBooker

Pruebas automatizadas E2E con **Cypress** para el sitio de práctica [Restful-Booker Platform](https://automationintesting.online/).

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
git clone <url-del-repo>
cd myTestRestfulBooker
npm install
```

## Ejecución de pruebas

```bash
# Abrir Cypress en modo interactivo
npx cypress open

# Ejecutar todas las pruebas en modo headless
npx cypress run

# Ejecutar un spec específico
npx cypress run --spec "cypress/e2e/adminLogin.cy.js"
```

## Estructura del proyecto

```
cypress/
├── e2e/
│   ├── adminLogin.cy.js             # Login del panel Admin
│   ├── myTestRestfulBooker.cy.js    # Reserva de habitaciones
│   └── sendUsaMessage.cy.js         # Envío de mensajes de contacto
├── fixtures/                        # Datos de prueba (admin, booking, message)
└── support/
    ├── loginCommands.js             # Comandos personalizados de login
    ├── bookingCommands.js           # Comandos personalizados de reservas
    └── messagingCommands.js         # Comandos personalizados de mensajes
cypress.config.js
```

## Estado del proyecto

| Módulo | Spec | Tests | Estado |
|--------|------|-------|--------|
| Login Admin | `adminLogin.cy.js` | 3 (login exitoso, password incorrecta, campos vacíos) | ✅ Automatizado |
| Reserva de habitación | `myTestRestfulBooker.cy.js` | 3 (datos válidos, teléfono inválido, email vacío) | ✅ Automatizado |
| Envío de mensaje | `sendUsaMessage.cy.js` | 3 (datos válidos, email inválido, nombre vacío) | ✅ Automatizado |
