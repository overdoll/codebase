/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TotpAuthenticationFragment$ref: FragmentReference;
declare export opaque type TotpAuthenticationFragment$fragmentType: TotpAuthenticationFragment$ref;
export type TotpAuthenticationFragment = {|
  +token: string,
  +$refType: TotpAuthenticationFragment$ref,
|};
export type TotpAuthenticationFragment$data = TotpAuthenticationFragment;
export type TotpAuthenticationFragment$key = {
  +$data?: TotpAuthenticationFragment$data,
  +$fragmentRefs: TotpAuthenticationFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TotpAuthenticationFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "token",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '55bc7d510df03ae19c971be944ec7966';
module.exports = node;
