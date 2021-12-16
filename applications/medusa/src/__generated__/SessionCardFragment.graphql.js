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
  +location: {|
    +city: string,
    +country: string,
    +subdivision: string,
  |},
  +lastSeen: any,
  +current: boolean,
  +created: any,
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
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "city",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "country",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "subdivision",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastSeen",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "created",
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
(node: any).hash = '7fe86353f01c06925816f5a505244077';
module.exports = node;
