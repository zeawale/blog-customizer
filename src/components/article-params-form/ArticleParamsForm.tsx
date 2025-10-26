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
	OptionType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	formValues: typeof import('src/constants/articleProps').defaultArticleState;
	onChange: (
		name: keyof typeof import('src/constants/articleProps').defaultArticleState,
		value: OptionType
	) => void;
	handleApplySettings: () => void;
	handleResetSettings: () => void;
};

export const ArticleParamsForm = ({
	formValues,
	onChange,
	handleApplySettings,
	handleResetSettings,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const sidebarRef = useRef<HTMLElement | null>(null);

	const handleSidebarToggle = () => setIsSidebarOpen((prev) => !prev);

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
