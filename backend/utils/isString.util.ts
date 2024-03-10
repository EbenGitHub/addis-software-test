export default function isString(text: unknown): text is string {
    if (text && (typeof text === 'string' || text instanceof String)) {
        return true
    }

    return false
}