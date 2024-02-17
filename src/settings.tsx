import { createRoot } from '@wordpress/element';
import Flags from './components/Flags';
import './styles/settings.scss';
const container = document.getElementById('mr_feature_flags_settings_screen');
const root = container && createRoot(container);
root?.render(<Flags />);
