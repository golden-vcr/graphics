export function formatTagName(tag: string): string {
  let copy = ''
  let prevWasLetter = false
  for (let i = 0; i < tag.length; i++) {
      const ord = tag.charCodeAt(i)
      const isLetter = ord >= 97 && ord <= 122
      if (isLetter && !prevWasLetter) {
          copy += tag[i].toUpperCase()
      } else {
          copy += tag[i]
      }
      prevWasLetter = isLetter
  }
  return copy.replaceAll('+', ' & ')
}

export function getTagColor(tag: string): string {
  switch (tag) {
      case 'instructional': return '#58bce3'
      case 'promotional': return '#f0e33c'
      case 'travel': return '#5ae4b5'
      case 'educational': return '#e45a9c'
      case 'self-help': return '#b232a8'
      case 'childrens': return '#e84f4f'
      case 'religion': return '#d9b70c'
      case 'fitness': return '#f9932a'
      case 'christmas': return '#3db53d'
      case 'features': return '#987460'
      case 'mystery': return '#5f5c14'
      case 'ephemera': return '#1b67ef'
      case 'entertainment': return '#e1f062'
      case 'sports': return '#a47230'
      case 'history': return '#6cc754'
      case 'technology': return '#009dd3'
      case 'arts+crafts': return '#f684ad'
  }
  return '#cccccc'
}
