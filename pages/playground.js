import { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Playground.module.css'

export default function Playground() {
	const [width, setWidth] = useState('100%')
	const [widthPosition, setWidthPosition] = useState(null)
	const [height, setHeight] = useState('auto')
	const [minHeight] = useState(291)
	const [heightPosition, setHeightPosition] = useState(null)
	const [resizing, setResizing] = useState(false)

	const [flexDirection, setFlexDirection] = useState('row')
	const [flexWrap, setFlexWrap] = useState('nowrap')
	const [justifyContent, setJustifyContent] = useState('flex-start')
	const [alignItems, setAlignItems] = useState('stretch')

	const defaultItem = {
		order: 0,
		flexGrow: 0,
		flexShrink: 1,
		flexBasis: '300px',
		alignSelf: 'auto'
	}
	const [items, setItems] = useState([{
		text: 1,
		...defaultItem
	}])

	const containerRef = useRef(null)

	const updateSetting = (e, prop, index) => {
		const newState = [...items]
		newState[index][prop] = e.target.value
		setItems(newState)
	}

	const addItem = () => {
		if (items.length < 10) {
			setItems([...items, { text: items.length + 1, ...defaultItem }])
		} else {
			alert(`Don't you think that's enough?`)
		}
	}

	const removeItem = () => {
		if (items.length > 1) {
			setItems(items.slice(0, items.length - 1))
		} else {
			alert(`Don't make the playground sad.`)
		}
	}

	const reset = () => {
		setWidth('100%')
		setWidthPosition(null)
		setHeight(200)
		setHeightPosition(null)
		setResizing(false)
		setFlexDirection('row')
		setFlexWrap('nowrap')
		setJustifyContent('flex-start')
		setAlignItems('stretch')
		const newState = items.map((i, index) => {
			return {
				text: index + 1,
				...defaultItem
			}
		})
		setItems(newState)
	}

	const resizeContainer = (e) => {
		if (resizing === 'x') {
			const diff = widthPosition - e.screenX
			setWidth(`calc(100% - ${diff}px)`)
		}

		if (resizing === 'y') {
			const diff = heightPosition - e.screenY
			if (containerRef.current.clientHeight >= minHeight) {
				setHeight(minHeight - diff)
			}
		}
	}

	return (
		<div className={styles.container}>
      <Head>
        <title>Flexbox Playground</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <a className={styles.link}>
          <h3>&larr; Home</h3>
        </a>
      </Link>
      <main
      	className={styles.main}
      	onMouseMove={(e) => resizeContainer(e)}
      	onMouseUp={() => {
      		if (resizing) {
      			setResizing(false)
      		}
      	}}
      >
        <h1 className={styles.title}>Flexbox Playground</h1>
        <div
        	ref={containerRef}
        	className={styles.flexContainer}
        	style={{ width, height, minHeight, flexDirection, flexWrap, justifyContent, alignItems }}
        >
        	{items.map((item, index) => {
        		const { text, ...rest } = item
        		return (
        			<div className={styles.flexItem} style={rest} key={index}>{text}</div>
        		)
        	})}
        	<div
        		className={styles.draggableX}
        		onMouseDown={(e) => {
        			if (!widthPosition) setWidthPosition(e.screenX)
        			setResizing('x')
        		}}
        	>
	        	|
	        </div>
	        <div
	        		className={styles.draggableY}
	        		onMouseDown={(e) => {
	        			if (!heightPosition) setHeightPosition(e.screenY)
	        			setResizing('y')
	        		}}
	        	>
	        	-
	        </div>
        </div>
        <button className={styles.button} onClick={addItem}>Add Item</button>
				<button className={styles.button} onClick={removeItem}>Remove Item</button>
				<button className={styles.button} onClick={reset}>Reset</button>
        <div className={styles.flexProperties}>
        	<div>
        		<h2>Flex Container Properties</h2>
		        <div>
			        <label className={styles.select}>flex-direction: </label>
							<select
								className={styles.select}
								value={flexDirection}
								onChange={(e) => {
									if (['column', 'column-reverse'].includes(e.target.value)) {
										setHeight('auto')
									}
									setFlexDirection(e.target.value)
								}}
							>
							    <option value="row">row</option>
							    <option value="row-reverse">row-reverse</option>
							    <option value="column">column</option>
							    <option value="column-reverse">column-reverse</option>
							</select>
						</div>
						<div>
			        <label className={styles.select}>flex-wrap: </label>
							<select
								className={styles.select}
								value={flexWrap}
								onChange={(e) => setFlexWrap(e.target.value)}>
							    <option value="nowrap">nowrap</option>
							    <option value="wrap">wrap</option>
							    <option value="wrap-reverse">wrap-reverse</option>
							</select>
						</div>
		        <div>
			        <label className={styles.select}>justify-content: </label>
							<select
								className={styles.select}
								value={justifyContent}
								onChange={(e) => setJustifyContent(e.target.value)}>
							    <option value="flex-start">flex-start</option>
							    <option value="center">center</option>
							    <option value="flex-end">flex-end</option>
							    <option value="space-around">space-around</option>
							    <option value="space-between">space-between</option>
							    <option value="space-evenly">space-evenly</option>
							</select>
						</div>
		        <div>
			        <label className={styles.select}>align-items: </label>
							<select
								className={styles.select}
								value={alignItems}
								onChange={(e) => setAlignItems(e.target.value)}>
							    <option value="stretch">stretch</option>
							    <option value="flex-start">flex-start</option>
							    <option value="flex-end">flex-end</option>
							    <option value="center">center</option>
							    <option value="baseline">baseline</option>
							</select>
						</div>
					</div>
					<div className={styles.flexItemsProperties}>
        		<h2>Flex Item Properties</h2>
        		<div style={{ display: 'flex' }}>
        			<div style={{ display: 'flex', flexDirection: 'column' }}>
        				<label className={styles.select}>order:</label>
        				<label className={styles.select}>flex-grow:</label>
        				<label className={styles.select}>flex-shrink:</label>
        				<label className={styles.select}>flex-basis:</label>
        				<label className={styles.select}>align-self:</label>
        				<label className={styles.select}>text:</label>
        			</div>
			        {items.map((item, index) => {
			        	return (
			        		<div style={{ display: 'flex', flexDirection: 'column' }} key={index}>
				        		<input className={styles.select} type="text" value={item.order} onChange={(e) => updateSetting(e, 'order', index)} />
				        		<input className={styles.select} type="text" value={item.flexGrow} onChange={(e) => updateSetting(e, 'flexGrow', index)} />
				        		<input className={styles.select} type="text" value={item.flexShrink} onChange={(e) => updateSetting(e, 'flexShrink', index)} />
				        		<input className={styles.select} type="text" value={item.flexBasis} onChange={(e) => updateSetting(e, 'flexBasis', index)} />
				        		<select
				        			className={styles.select}
				        			value={item.alignSelf}
				        			onChange={(e) => updateSetting(e, 'alignSelf', index)}>
									    <option value="auto">auto</option>
									    <option value="flex-start">flex-start</option>
									    <option value="flex-end">flex-end</option>
									    <option value="center">center</option>
									    <option value="baseline">baseline</option>
									    <option value="stretch">stretch</option>
										</select>
				        		<input className={styles.select} type="text" value={item.text} onChange={(e) => updateSetting(e, 'text', index)} />
									</div>
				        )
				      })}
        		</div>
					</div>
				</div>
     </main>
    </div>
	)
}
