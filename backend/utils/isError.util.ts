export default function isError(error: unknown): error is Error {
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
        return true
    }

    return false
}