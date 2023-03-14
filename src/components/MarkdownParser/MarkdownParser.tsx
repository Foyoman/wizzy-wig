import React, { useEffect, useRef, useState, useMemo } from "react";
import { debounce } from "lodash";

import "./MarkdownParser.scss"
import './github.scss';

import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import c from "react-syntax-highlighter/dist/cjs/languages/prism/c";
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";
import csharp from "react-syntax-highlighter/dist/cjs/languages/prism/csharp";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rangeParser from "parse-numeric-range";

import Editor, { useMonaco } from "@monaco-editor/react";
import Split from "react-split";

import { KeyboardTab } from "@mui/icons-material";
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('bash', bash);


// Markdown Preview Component

interface PreviewProps {
	content: string | undefined;
	theme: typeof oneDark | "vs-light" | "vs-dark";
}

function MarkdownPreview({ content, theme }: PreviewProps) {
	// syntax highlighter configuration for react-markdown
	const MemoizedMarkdownComponents = useMemo(() => {
		return {
			code({ node, inline, className, children, ...props}: any) {
				const code = String(children).replace(/\n$/, "")
				
				const match = /language-(\w+)/.exec(className || '');
				const hasMeta = node?.data?.meta;
				
				const applyHighlights: object = (applyHighlights: number) => {
					if (hasMeta) {
						const RE = /{([\d,-]+)}/;
						const metadata = node.data.meta?.replace(/\s/g, '');
						const strlineNumbers = RE?.test(metadata) 
						? RE.exec(metadata)![1] 
						: '0';
						const highlightLines = rangeParser(strlineNumbers);
						const highlight = highlightLines;
						const data: string | null = highlight.includes(applyHighlights)
						? 'highlight'
						: null;
						return { data };
					} else {
						return {};
					}
				}
				
				const style = {
					style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' }
				}
				
				Object.assign(applyHighlights, style);
				
				return match ? (
					<SyntaxHighlighter
						style={theme}
						language={match[1]}
						PreTag="div"
						className="codeStyle"
						showLineNumbers={true}
						wrapLines={hasMeta ? true : false}
						// wrapLines={true}
						useInlineStyles={true}
						lineProps={applyHighlights}
						{...props}
					>
						{code}
					</SyntaxHighlighter>
				) : (
					<code className={className} {...props}> 
						{children}
					</code>
				)
			},
		};
	}, [theme]);
	
	const MemoizedMarkdown = useMemo(() => {
    return (
			<ReactMarkdown
				components={MemoizedMarkdownComponents}
				className="markdown-body"
			>
				{ content || "" }
			</ReactMarkdown>
		)
  }, [MemoizedMarkdownComponents, content]);

	return MemoizedMarkdown;
}

// Editor Component

interface EditorProps {
	content: string | undefined;
	theme: "vs-dark" | "vs-light" | undefined;
	updateMarkdown: (value: string) => void;
}

function MarkdownEditor(props: EditorProps) {
	const { content, theme, updateMarkdown } = props;
	const monaco = useMonaco();

	// no clue what this does
	useEffect(() => {
		monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
	}, [monaco]);

	// debounce updating markdown to improve performance
	const debouncedSetMarkdown = debounce((value: string) => {
		console.log('running debounced set markdown...')
		updateMarkdown(value);
	}, 1000);

	// handle monaco editor changes
	const handleInputChange = useMemo(() => { 
		return (value: string | undefined) => {
			if (value) {
				if (value.length <= 500) {
					updateMarkdown(value);
				} else {
					debouncedSetMarkdown(value);
				}
			} else {
				updateMarkdown("");
			}
		};
	}, [debouncedSetMarkdown, updateMarkdown]);

	const MemoizedEditor = useMemo(() => {
		return (
			<Editor 
				height="100%"
				width="100%"
				defaultLanguage="markdown"
				defaultValue=""
				theme={theme}
				value={content}
				onChange={handleInputChange}
				options={{
					selectOnLineNumbers: true,
					wordWrap: "on",
				}}
				className="md-editor"
			/>
		)
	}, [content, handleInputChange, theme]);

	return MemoizedEditor;
}


// Full Parent Component

interface MarkdownParserProps {
	content?: string;
	theme?: "light" | "dark" | undefined;
	splitDirection?: "vertical" | "horizontal" | undefined;
	updateSaveState?: (content: string) => void;
}

const MarkdownParser = ({ 
	content = "",
	theme = 'dark',
	splitDirection = 'vertical',
	updateSaveState,
}: MarkdownParserProps) => {
	const [markdown, setMarkdown] = useState(content);
	const [saved, setSaved] = useState(true);
	const [split, setSplit] = useState(splitDirection);
	const [lastEditTime, setLastEditTime] = useState(0);
	const [collapsedIndex, setCollapsedIndex] = useState<number>();
	const [componentEl, setComponentEl] = useState<HTMLElement | null>(null);
	const markdownEl = useRef<HTMLDivElement>(null);

	// handle change from child editor component
	const handleEditorChange = (value: string) => {
		setMarkdown(value);
		setLastEditTime(Date.now());
		setSaved(false);
	}

	// trigger autosave after 3 seconds of inactivity
	useEffect(() => {
		if (!updateSaveState || saved) return;
		const timeout = setTimeout(() => {
			const now = Date.now();
			const timeSinceLastEdit = now - lastEditTime;
			if(timeSinceLastEdit >= 3000) {
				updateSaveState('yo');
				setSaved(true);
			}
		}, 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [lastEditTime, saved, updateSaveState]);

	// markdown and editor theming
	let markdownTheme: typeof oneDark;
	let editorTheme: "vs-dark" | "vs-light";
	if (theme === "light") {
		markdownTheme = oneLight;
		editorTheme = 'vs-light';
	} else {
		markdownTheme = oneDark;
		editorTheme = 'vs-dark';
	}

	// adjust the resize bar's classes according to split direction
	useEffect(() => {
		if (!componentEl) {
			const component = document.getElementById('md-parser');
			setComponentEl(component);
		} else {
			const gutter = componentEl.querySelector('.gutter');
			if (split === "horizontal") {
				gutter?.classList.remove('gutter-vertical');
				gutter?.classList.add('gutter-horizontal');
			} else {
				gutter?.classList.remove('gutter-horizontal');
				gutter?.classList.add('gutter-vertical');
			}
		}
	}, [componentEl, split]);

	return (
		<Split 
			id="md-parser"
			className={`md-parser ${theme}`}
			direction={split}
			sizes={[50, 50]}
			minSize={[0, 0]}
			snapOffset={split === 'horizontal' ? 75 : 55}
			collapsed={collapsedIndex}
			onDrag={() => setCollapsedIndex(undefined)} // I'd set it to null but onDrag's type is number | undefined
			gutterSize={20}
			style={{
				flexDirection: split === 'horizontal' ? 'row' : 'column'
			}}
		>
			<div 
				ref={markdownEl} 
				className="md-preview component"
				style={{ 
					height: split === 'horizontal' ? '100%' : '',
					width: split === 'horizontal' ? '' : '100%'
				}}
			>
				<MarkdownPreview 
					content={markdown} 
					theme={markdownTheme} 
				/>
				{ split === "horizontal" ?
				<HorizontalSplitIcon 
					className="split-icon" 
					titleAccess="Enable vertical split" 
					onClick={() => setSplit("vertical")}
				/>
				:
				<VerticalSplitIcon 
					className="split-icon" 
					titleAccess="Enable horizontal split"
					onClick={() => setSplit("horizontal")}
				/>
				}
				<KeyboardTab 
					className={`
						collapse-tab 
						${split === 'horizontal' ? 'horizontal' : 'vertical'}
					`}
					onClick={() => setCollapsedIndex(0)} 
					titleAccess="Collapse"
				/>
			</div>
			<div 
				className="md-editor component" 
				style={{ 
					height: split === 'horizontal' ? '100%' : '',
					width: split === 'horizontal' ? '' : '100%'
				}}
			>
				<div className="padding" />
				<MarkdownEditor 
					content={content} 
					theme={editorTheme} 
					updateMarkdown={handleEditorChange} 
				/>
				<KeyboardTab 
					className={`
						collapse-tab 
						${split === 'horizontal' ? 'horizontal' : 'vertical'}
					`} 
					onClick={() => setCollapsedIndex(1)}
					titleAccess="Collapse"
				/>
			</div>
		</Split>
	)
}

export default React.memo(MarkdownParser);