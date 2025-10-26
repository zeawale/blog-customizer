import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApplySettings: (newSettings: typeof defaultArticleState) => void;
	currentSettings: typeof defaultArticleState;
};

export const ArticleParamsForm = ({
	onApplySettings,
	currentSettings,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const sidebarRef = useRef<HTMLElement | null>(null);

	const [formValues, setFormValues] = useState(currentSettings);

	const handleSidebarToggle = () => setIsSidebarOpen((prev) => !prev);

	const onChange = (
		name: keyof typeof formValues,
		value: (typeof formValues)[keyof typeof formValues]
	) => {
		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleApplySettings = () => {
		onApplySettings(formValues);
	};

	const handleResetSettings = () => {
		setFormValues(defaultArticleState);
		onApplySettings(defaultArticleState);
	};

	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isSidebarOpen]);

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={handleSidebarToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApplySettings();
					}}
					onReset={(e) => {
						e.preventDefault();
						handleResetSettings();
					}}>
					<h2 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formValues.fontFamilyOption}
						onChange={(option) => onChange('fontFamilyOption', option)}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formValues.fontSizeOption}
						onChange={(option) => onChange('fontSizeOption', option)}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formValues.fontColor}
						onChange={(option) => onChange('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formValues.backgroundColor}
						onChange={(option) => onChange('backgroundColor', option)}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formValues.contentWidth}
						onChange={(option) => onChange('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
