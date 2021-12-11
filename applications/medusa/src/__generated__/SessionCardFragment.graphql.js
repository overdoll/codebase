/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { RevokeSessionFragment$ref } from "./RevokeSessionFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type SessionCardFragment$ref: FragmentReference;
declare export opaque type SessionCardFragment$fragmentType: SessionCardFragment$ref;
export type SessionCardFragment = {|
  +device: string,
  +ip: string,
  +created: any,
  +current: boolean,
  +$fragmentRefs: RevokeSessionFragment$ref,
  +$refType: SessionCardFragment$ref,
|};
export type SessionCardFragment$data = SessionCardFragment;
export type SessionCardFragment$key = {
  +$data?: SessionCardFragment$data,
  +$fragmentRefs: SessionCardFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SessionCardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "device",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ip",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "created",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "current",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RevokeSessionFragment"
    }
  ],
  "type": "AccountSession",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '71dac3647a93bc7cb5f4e6a59160b02a';
module.exports = node;
