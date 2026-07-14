import { openUrl } from "@tauri-apps/plugin-opener";
import { useUILayoutContext } from "../../contexts";
import { formatTrialRemaining, useLicenseStatus } from "../../lib/license";

const TRIAL_URGENT_SECONDS = 3 * 24 * 60 * 60;

export function LicenseStatusFooter() {
	const { openSettings } = useUILayoutContext();
	const { status } = useLicenseStatus(false);

	if (!status) return null;

	if (status.mode !== "trial_active") return null;

	const remaining = status.trial_remaining_seconds;
	const isUrgent = remaining != null && remaining <= TRIAL_URGENT_SECONDS;
	const remainingLabel = formatTrialRemaining(remaining);

	return (
		<div
			className="licenseSidebarFooter"
			data-mode="trial"
			data-urgent={isUrgent ? "true" : "false"}
			aria-live="polite"
		>
			<button
				type="button"
				className="licenseSidebarInfo"
				onClick={() => openSettings("general")}
				aria-label={`Manage license. Trial ${remainingLabel}.`}
				title="Manage license"
			>
				<span className="licenseSidebarText">
					<span className="licenseSidebarLabel">Trial</span>
					<span className="licenseSidebarMeta">{remainingLabel}</span>
				</span>
			</button>
			<button
				type="button"
				className="licenseSidebarAction"
				onClick={() => void openUrl(status.purchase_url)}
			>
				Upgrade
			</button>
		</div>
	);
}
