$FILE_EXEC = Join-Path $PSScriptRoot "..\gateway\runtime\Microsoft.Fabric.Workload.DevGateway.dll"
$MANIFEST_PATH = Join-Path $PSScriptRoot "..\manifest\Org.MyWorkload.1.0.0.nupkg"
$WORKSPACE_GUID = "000d7741-de4a-44fe-b26c-00848dc76181"

$TOKEN = az account get-access-token --scope https://analysis.windows.net/powerbi/api/.default --query accessToken -o tsv

& dotnet $FILE_EXEC -LogLevel Information -DevMode:UserAuthorizationToken $TOKEN -DevMode:ManifestPackageFilePath $MANIFEST_PATH -DevMode:WorkspaceGuid $WORKSPACE_GUID