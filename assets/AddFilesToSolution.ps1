#Taken from: https://stackoverflow.com/questions/17382308/include-file-in-project-from-command-line
#CALLED LIKE: powershell -File C:\AddExistingItem.ps1 -solutionPath "C:\Test.sln" -projectName "TestAddItem" -item "C:\Test.txt"
param([String]$solutionPath, [String]$projectName, [String[]]$items)

#BEGIN: section can be removed if executing from within a PowerShell window
$source = @" 

namespace EnvDteUtils
{ 
    using System; 
    using System.Runtime.InteropServices; 

    public class MessageFilter : IOleMessageFilter 
    { 
        // 
        // Class containing the IOleMessageFilter 
        // thread error-handling functions. 

        // Start the filter. 
        public static void Register() 
        { 
            IOleMessageFilter newFilter = new MessageFilter();  
            IOleMessageFilter oldFilter = null;  
            CoRegisterMessageFilter(newFilter, out oldFilter); 
        } 

        // Done with the filter, close it. 
        public static void Revoke() 
        { 
            IOleMessageFilter oldFilter = null;  
            CoRegisterMessageFilter(null, out oldFilter); 
        } 

        // 
        // IOleMessageFilter functions. 
        // Handle incoming thread requests. 
        int IOleMessageFilter.HandleInComingCall(int dwCallType,  
          System.IntPtr hTaskCaller, int dwTickCount, System.IntPtr  
          lpInterfaceInfo)  
        { 
            //Return the flag SERVERCALL_ISHANDLED. 
            return 0; 
        } 

        // Thread call was rejected, so try again. 
        int IOleMessageFilter.RetryRejectedCall(System.IntPtr  
          hTaskCallee, int dwTickCount, int dwRejectType) 
        { 
            if (dwRejectType == 2) 
            // flag = SERVERCALL_RETRYLATER. 
            { 
                // Retry the thread call immediately if return >=0 &  
                // <100. 
                return 99; 
            } 
            // Too busy; cancel call. 
            return -1; 
        } 

        int IOleMessageFilter.MessagePending(System.IntPtr hTaskCallee,  
          int dwTickCount, int dwPendingType) 
        { 
            //Return the flag PENDINGMSG_WAITDEFPROCESS. 
            return 2;  
        } 

        // Implement the IOleMessageFilter interface. 
        [DllImport("Ole32.dll")] 
        private static extern int  
          CoRegisterMessageFilter(IOleMessageFilter newFilter, out  
          IOleMessageFilter oldFilter); 
    } 

    [ComImport(), Guid("00000016-0000-0000-C000-000000000046"),  
    InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)] 
    interface IOleMessageFilter  
    { 
        [PreserveSig] 
        int HandleInComingCall(  
            int dwCallType,  
            IntPtr hTaskCaller,  
            int dwTickCount,  
            IntPtr lpInterfaceInfo); 

        [PreserveSig] 
        int RetryRejectedCall(  
            IntPtr hTaskCallee,  
            int dwTickCount, 
            int dwRejectType); 

        [PreserveSig] 
        int MessagePending(  
            IntPtr hTaskCallee,  
            int dwTickCount, 
            int dwPendingType); 
    } 
} 
"@ 

Add-Type -TypeDefinition $source      

[EnvDTEUtils.MessageFilter]::Register()
#END: section can be removed if executing from within a PowerShell window

$IDE = New-Object -ComObject VisualStudio.DTE.15.0

$IDE.Solution.Open("$solutionPath")

$project = $IDE.Solution.Projects | ? { $_.Name -eq "$projectName" }
$items | foreach {
    $project.ProjectItems.AddFromFile("$_") | Out-Null
}
$project.Save()

$IDE.Quit()

#BEGIN: section can be removed if executing from within a PowerShell window
[EnvDTEUtils.MessageFilter]::Revoke()
#END: section can be removed if executing from within a PowerShell window