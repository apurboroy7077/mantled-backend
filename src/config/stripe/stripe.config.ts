import Stripe from 'stripe';
import { stripeSecretKey } from '../../data/environmentVariables';
export const myStripe = new Stripe(stripeSecretKey);
