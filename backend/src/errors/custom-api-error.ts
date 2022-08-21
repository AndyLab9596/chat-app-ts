class CustomeAPIError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export default CustomeAPIError;