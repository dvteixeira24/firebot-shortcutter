# bun run build
# Define source and destination paths

$source = ".\.env.example"

if (Test-Path $source) {
    Write-Host "Source file exists: $source"
}
else {
    Write-Host "Source file does not exist."
}

$destination = ".\dist\server\.env"
# Copy the .env file to the server directory
Copy-Item -Path $source -Destination $destination -Force