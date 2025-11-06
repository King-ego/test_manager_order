function SystemLogs(message: string) {
    const date = new Date();
    console.log(`[${date.toISOString()}] - ${message}`);
}

export { SystemLogs };