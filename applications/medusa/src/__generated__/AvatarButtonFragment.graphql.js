/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type AvatarButtonFragment$ref: FragmentReference;
declare export opaque type AvatarButtonFragment$fragmentType: AvatarButtonFragment$ref;
export type AvatarButtonFragment = {|
  +avatar: any,
  +$refType: AvatarButtonFragment$ref,
|};
export type AvatarButtonFragment$data = AvatarButtonFragment;
export type AvatarButtonFragment$key = {
  +$data?: AvatarButtonFragment$data,
  +$fragmentRefs: AvatarButtonFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AvatarButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '8304adcee9e6315b26337922d9e2dc26';
module.exports = node;
