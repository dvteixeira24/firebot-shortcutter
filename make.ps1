Remove-Item -LiteralPath "dist" -Force -Recurse

bun run build

# Define source and destination paths
$source = ".\.env.example"

if (Test-Path $source) {
    Write-Host "Source file exists: $source"
}
else {
    Write-Host "Source file does not exist."
}

$destination = ".\dist\.env"
# Copy the .env file to the server directory
Copy-Item -Path $source -Destination $destination -Force


$packageJson = Get-Content -Path ".\package.json" | ConvertFrom-Json
$version = $packageJson.version
# Define the TAG value (you can set this as needed, e.g., "v1.0" or use Git tag if you prefer)
$commitHash = git rev-parse --short HEAD

# Combine the version and commit hash
$TAG = "v$version-$commitHash"

# Compress the contents of the dist directory into a zip file named $TAG.zip
$zipFileName = ".\dist\firebot-shortcutter-$TAG.zip"
Compress-Archive -Path ".\dist\*" -DestinationPath $zipFileName

Write-Host "Zipped contents of 'dist' into $zipFileName"
