
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("../../package.json");

const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "FlexLife Fitness Backend API",
		version,
		description: "REST API documentation for FlexLife Fitness workout app backend."
	},
	servers: [
		{
			url: "http://localhost:3000",
			description: "Local server"
		}
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT"
			}
		},
		schemas: {
			Workout: {
				type: "object",
				properties: {
					_id: { type: "string" },
					name: { type: "string" },
					description: { type: "string" },
					difficulty: { type: "string" },
					duration: { type: "integer" }
				}
			},
			Exercise: {
				type: "object",
				properties: {
					_id: { type: "string" },
					workout_id: { type: "string" },
					name: { type: "string" },
					sets: { type: "integer" },
					reps: { type: "integer" },
					duration: { type: "integer" }
				}
			},
			WorkoutDetails: {
				type: "object",
				properties: {
					_id: { type: "string" },
					name: { type: "string" },
					description: { type: "string" },
					difficulty: { type: "string" },
					duration: { type: "integer" },
					exercises: {
						type: "array",
						items: { $ref: "#/components/schemas/Exercise" }
					}
				}
			},
			UserWorkout: {
				type: "object",
				properties: {
					_id: { type: "string" },
					user_id: { type: "string" },
					workout_id: { $ref: "#/components/schemas/Workout" },
					scheduled_date: { type: "string", format: "date" },
					completed: { type: "boolean" },
					completed_at: { type: "string", format: "date-time" }
				}
			}
		}
	},
	security: [{ bearerAuth: [] }]
};

const options = {
	swaggerDefinition,
	apis: [
		"./src/routes/*.js",
		"./src/controllers/*.js",
		"./src/models/*.js"
	]
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
