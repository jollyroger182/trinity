export function formatTime(totalSeconds: number) {
	totalSeconds = Math.round(totalSeconds)

	const minutes = Math.floor(totalSeconds / 60) % 60
	const hours = Math.floor(totalSeconds / 3600)

	let text = ''
	if (hours) text += `${hours}h `
	if (minutes) text += `${minutes}m `

	return text.trim() || '0m'
}
