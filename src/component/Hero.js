import React, { useEffect, useState, useRef } from 'react'
import './hero.css'
import { makeStyles } from '@material-ui/core/styles'
import { Popover, CircularProgress } from '@material-ui/core'
import Colors from '../colors.json'

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));



function Hero() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [colors, setColors] = useState([])
	const [loading, setLoading] = useState(true)
	const [stack, setStack] = useState([])
	const [element, setElement] = useState(null)
	const [bodyColor, setBodyColor] = useState('')

	useEffect(() => {
		setLoading(true)
		if (Colors.length > 0) {
			setLoading(false)
			const filteredColors = Colors.filter(c => c!== "")
			setColors(filteredColors)
			setStack(filteredColors.slice(0, 10))
		}
	}, [])

	const loadColors=()=>{
		setLoading(true);
		setTimeout(()=>{
			setStack(colors.slice(0,stack.length + 10))
			setLoading(false)
		},500)
	}

	const observer = useRef(
		new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				loadColors()
			}
		}, { threshold: 1 })
	)

	useEffect(() => {
		const currentElement = element
		const currentObserver = observer.current
		if (currentElement) {
			currentObserver.observe(currentElement)
		}
		return () => {
			if (currentElement) {
				currentObserver.unobserve(currentElement)
			}
		}
	}, [element])

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
		console.log(anchorEl)
	  }
	
	  const handleClose = () => {
		setAnchorEl(null);
	  }
	
	  const open = Boolean(anchorEl)
	  const id = open ? 'simple-popover' : undefined;
	
	
  return (
    <div>
		
		{ loading && <CircularProgress color='secondary' style={{marginTop: '40vh'}} /> }
		
		{!loading &&
			<div>
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
					}}
					transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
					}}
				>
					<div ref={setElement} className={classes.typography}>
						{stack.map(color => (
							<h3 
							onClick={() => {
								setBodyColor(color)
								handleClose()
							}}
							style={{backgroundColor: `#${color}`}}> {color} </h3>
						))}
					</div>
				</Popover>
		</div>}


		{!loading &&
			<div
				className='navbar'
				onClick={handleClick}
				style={{
				backgroundColor: 'black'
			}}>
				<h2 style={{
					color: 'blanchedalmond'
				}}>The Color Picker</h2>
			</div>}


			{!loading &&
				<div
				className='main'
				onClick={handleClick}
				style={{
				backgroundColor: bodyColor ? `#${bodyColor}` : '#ff006e',
				padding: '0 5rem'
			}}>
				<h2 style={{
					color: 'lightgrey'
				}}>
					This is the Color Picker
				</h2>
				<hr style={{
					backgroundColor: 'black',
					width: '60%',
					height: '5px',
					border: 'none'
				}}/>
				<h3 style={{
					color: 'lightgrey'
				}}>
					A different form of color picker where you can directly pick the color of various sections of the webpage and find the best combination that suits your Web app.
					Click on the screen and choose the color you want to put in that particular section you clicked.
					Everytime you reload the page a random set of colors appear.
				</h3>
			</div>}
    </div>
  )
}

export default Hero
