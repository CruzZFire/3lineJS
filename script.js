document.addEventListener('DOMContentLoaded', () => {
    const levelContainer = document.querySelector('.level-container')
    const width = 10
    const tiles = []
    const scoreDisplay = document.getElementById('score')
    let score = 0

    const tileColors = [
        'url(assets/bag-icon.png)',
        'url(assets/gun-icon.png)',
        'url(assets/drink-icon.png)',
        'url(assets/cart-icon.png)',
        'url(assets/cards-icon.png)',
        'url(assets/cactus-icon.png)'
    ]

    //level creation
    function levelCreate() {
        for (let i = 0; i < width*width; i++) {
            const tile = document.createElement('div')
            let randomColor = Math.floor(Math.random() * tileColors.length)
            tile.style.backgroundImage = tileColors[randomColor]
            tile.setAttribute('draggable', true)
            tile.setAttribute('id', i)
            levelContainer.appendChild(tile)
            tiles.push(tile)
        }
    }
    levelCreate()

    //dragging tiles
    let colorOrigin
    let tileOriginId
    let colorDestiny
    let tileDestinyId

    tiles.forEach(tile => tile.addEventListener('dragstart', pickTile))
    tiles.forEach(tile => tile.addEventListener('dragend', dragEnd))
    tiles.forEach(tile => tile.addEventListener('dragover', dragOver))
    tiles.forEach(tile => tile.addEventListener('dragenter', dragEnter))
    tiles.forEach(tile => tile.addEventListener('dragleave', dragLeave))
    tiles.forEach(tile => tile.addEventListener('drop', dropTile))

    //color swap
    function pickTile() {
        colorOrigin = this.style.backgroundImage
        tileOriginId = parseInt(this.id)
    }

    function dropTile() {
        colorDestiny = this.style.backgroundImage
        tileDestinyId = parseInt(this.id)
        tiles[tileOriginId].style.backgroundImage = colorDestiny
        this.style.backgroundImage = colorOrigin
    }

    //move validation
    function dragEnd() {
        const allowedMoves = [
            tileOriginId - 1,
            tileOriginId + 1,
            tileOriginId - width,
            tileOriginId + width
        ]

        let allowedMove = allowedMoves.includes(tileDestinyId)

        if (tileDestinyId && allowedMove) {
            tileDestinyId = null
        } else if (tileDestinyId && !allowedMove) {
            tiles[tileDestinyId].style.backgroundImage = colorDestiny
            tiles[tileOriginId].style.backgroundImage = colorOrigin
        } else {
            tiles[tileOriginId].style.backgroundImage = colorOrigin
        }
    }

    function dragOver(e) {
        e.preventDefault()
    }

    function dragEnter(e) {
        e.preventDefault()
    }

    function dragLeave() {
        
    }

    //matchs checking
    function checkThreeLine() {
        for (i=0; i < (tiles.length - 2); i++) {
            let threeLine = [i, i+1, i+2]
            let checkingColor = tiles[i].style.backgroundImage
            const isEmpty = tiles[i].style.backgroundImage === ''
            const tilesToAvoid = [
                8,9,18,19,
                28,29,38,39,
                48,49,58,59,
                68,69,78,79,
                88,89,98,99
            ]
            
            if (tilesToAvoid.includes(i)) continue

            if (threeLine.every(index => tiles[index].style.backgroundImage === checkingColor && !isEmpty)) {
                score += 10
                scoreDisplay.innerHTML = score
                threeLine.forEach(index => tiles[index].style.backgroundImage = '')
            }
        }
    }
    function checkThreeCol() {
        for (i=0; i < (width*width - width*2); i++) {
            let threeCol = [i, i+width, i+(width*2)]
            let checkingColor = tiles[i].style.backgroundImage
            const isEmpty = tiles[i].style.backgroundImage === ''

            if (threeCol.every(index => tiles[index].style.backgroundImage === checkingColor && !isEmpty)) {
                score += 10
                scoreDisplay.innerHTML = score
                threeCol.forEach(index => tiles[index].style.backgroundImage = '')
            }
        }
    }
    function checkFourLine() {
        for (i=0; i < (tiles.length - 3); i++) {
            let fourLine = [i, i+1, i+2, i+3]
            let checkingColor = tiles[i].style.backgroundImage
            const isEmpty = tiles[i].style.backgroundImage === ''
            const tilesToAvoid = [
                7,8,9,17,18,19,
                27,28,29,37,38,39,
                47,48,49,57,58,59,
                67,68,69,77,78,79,
                87,88,89,97,98,99
            ]
            
            if (tilesToAvoid.includes(i)) continue

            if (fourLine.every(index => tiles[index].style.backgroundImage === checkingColor && !isEmpty)) {
                score += 20
                scoreDisplay.innerHTML = score
                fourLine.forEach(index => tiles[index].style.backgroundImage = '')
            }
        }
    }
    function checkFourCol() {
        for (i=0; i < (width*width - width*3); i++) {
            let fourCol = [i, i+width, i+(width*2), i+(width*3)]
            let checkingColor = tiles[i].style.backgroundImage
            const isEmpty = tiles[i].style.backgroundImage === ''

            if (fourCol.every(index => tiles[index].style.backgroundImage === checkingColor && !isEmpty)) {
                score += 20
                scoreDisplay.innerHTML = score
                fourCol.forEach(index => tiles[index].style.backgroundImage = '')
            }
        }
    }
    function checkFiveLine() {
        for (i=0; i < (tiles.length - 4); i++) {
            let fiveLine = [i, i+1, i+2, i+3, i+4]
            let checkingColor = tiles[i].style.backgroundImage
            const isEmpty = tiles[i].style.backgroundImage === ''
            const tilesToAvoid = [
                6,7,8,9,16,17,18,19,
                26,27,28,29,36,37,38,39,
                46,47,48,49,56,57,58,59,
                66,67,68,69,76,77,78,79,
                86,87,88,89,96,97,98,99
            ]
            
            if (tilesToAvoid.includes(i)) continue

            if (fiveLine.every(index => tiles[index].style.backgroundImage === checkingColor && !isEmpty)) {
                score += 40
                scoreDisplay.innerHTML = score
                fiveLine.forEach(index => tiles[index].style.backgroundImage = '')
            }
        }
    }
    function checkFiveCol() {
        for (i=0; i < (width*width - width*3); i++) {
            let fiveCol = [i, i+width, i+(width*2), i+(width*3), i+(width*4)]
            let checkingColor = tiles[i].style.backgroundImage
            const isEmpty = tiles[i].style.backgroundImage === ''

            if (fiveCol.every(index => tiles[index].style.backgroundImage === checkingColor && !isEmpty)) {
                score += 40
                scoreDisplay.innerHTML = score
                fiveCol.forEach(index => tiles[index].style.backgroundImage = '')
            }
        }
    }
    

    //moving after checking
    function moveTiles() {
        for (i=0; i < 90; i++) {
            if (tiles[i + width].style.backgroundImage === '') {
                tiles[i + width].style.backgroundImage = tiles[i].style.backgroundImage
                tiles[i].style.backgroundImage = ''
            }
            const firstRow = [0,1,2,3,4,5,6,7,8,9]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && tiles[i].style.backgroundImage === '') {
                let randomColor = Math.floor(Math.random() * tileColors.length)
                tiles[i].style.backgroundImage = tileColors[randomColor]
            }
        }
    }

    window.setInterval(function() {
        moveTiles()
        checkFiveLine()
        checkFiveCol()
        checkFourLine()
        checkFourCol()
        checkThreeLine()
        checkThreeCol()
    }, 50)


})