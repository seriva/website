import { css } from "../utils/reactive.js";
import { fontStyles } from "./fonts.styles.js";
import { resetStyles } from "./reset.styles.js";
import { sharedStyles } from "./shared.styles.js";
import { themeStyles } from "./theme.styles.js";

export const mainStyles = css`
	${fontStyles}
	${themeStyles}
	${resetStyles}
	${sharedStyles}
`;
