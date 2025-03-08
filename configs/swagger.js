import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce API Web Manager - Backend",
            version: "1.0.0",
            description:
                "Este proyecto se centra en el desarrollo de una API web implementada en NodeJS, destinada a gestionar el registro de ventas, productos en línea y otras operaciones comerciales de una empresa. La aplicación se estructura en dos secciones principales, administrador y cliente, cada uno con funcionalidades específicas.",
            contact: {
                name: "Anthony Josue Escobar Ponce",
                email: "anthonyescobarponce@Outlook.com",
            },
        },
        servers: [
            {
                url: "http://127.0.0.1:3001/EcommerceManagement/v1",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [
        "./src/auth/auth.routes.js", 
        "./src/user/user.routes.js", 
        "./src/category/category.routes.js", 
        "./src/product/product.routes.js", 
        "./src/shoppingCart/cart.routes.js"
    ],
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };
