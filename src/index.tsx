import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [articleState, setArticleState] = useState(defaultArticleState);
	const sidebarRef = useRef<HTMLElement | null>(null);
	const [formValues, setFormValues] = useState(defaultArticleState);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleChange = (name: keyof typeof formValues, value: any) => {
		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleApply = () => {
		setArticleState(formValues);
	};

	const handleReset = () => {
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
				isOpen={isSidebarOpen}
				onToggle={() => setIsSidebarOpen((prev) => !prev)}
				sidebarRef={sidebarRef}
				formValues={formValues}
				onChange={handleChange}
				onApply={handleApply}
				onReset={handleReset}
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
