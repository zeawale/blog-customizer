import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);
	const [formValues, setFormValues] = useState(defaultArticleState);

	const handleChange = (
		name: keyof typeof formValues,
		value: (typeof formValues)[keyof typeof formValues]
	) => {
		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleApplySettings = () => {
		setArticleState(formValues);
	};

	const handleResetSettings = () => {
		setFormValues(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formValues={formValues}
				onChange={handleChange}
				handleApplySettings={handleApplySettings}
				handleResetSettings={handleResetSettings}
			/>

			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
