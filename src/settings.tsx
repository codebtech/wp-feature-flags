import { render } from '@wordpress/element';
import Flags from './components/Flags';
import './styles/settings.scss';
render(<Flags />, document.getElementById('mr_feature_flags_settings_screen'));
