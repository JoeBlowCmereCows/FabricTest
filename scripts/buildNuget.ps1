$PACKAGE_PATH = Join-Path $PSScriptRoot "..\manifest"
$PACKAGE_NAME = "Org.MyWorkload.1.0.0.nupkg"

Set-Location $PACKAGE_PATH
Remove-Item $PACKAGE_NAME -ErrorAction SilentlyContinue
Compress-Archive -Path * -Update -DestinationPath $PACKAGE_NAME

Set-Location $PSScriptRoot