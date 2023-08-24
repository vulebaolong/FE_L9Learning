import "swagger-ui-react/swagger-ui.css";
import "./customSwaggerTheme.css";
import swaggerJson from "./swagger.json";
import SwaggerUI from "swagger-ui-react";

function SwaggerUIComponent() {
	return (
		<section className="pb-24">
			<div className="container">
				<SwaggerUI spec={swaggerJson}/>
			</div>
		</section>
	);
}
export default SwaggerUIComponent;
