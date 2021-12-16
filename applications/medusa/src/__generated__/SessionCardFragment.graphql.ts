/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

<<<<<<< HEAD:applications/medusa/src/__generated__/SessionCardFragment.graphql.js
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
=======
import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SessionCardFragment = {
    readonly device: string;
    readonly ip: string;
    readonly created: unknown;
    readonly current: boolean;
    readonly " $refType": "SessionCardFragment";
};
>>>>>>> master:applications/medusa/src/__generated__/SessionCardFragment.graphql.ts
export type SessionCardFragment$data = SessionCardFragment;
export type SessionCardFragment$key = {
    readonly " $data"?: SessionCardFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SessionCardFragment">;
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
<<<<<<< HEAD:applications/medusa/src/__generated__/SessionCardFragment.graphql.js
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
=======
>>>>>>> master:applications/medusa/src/__generated__/SessionCardFragment.graphql.ts
    }
  ],
  "type": "AccountSession",
  "abstractKey": null
};
<<<<<<< HEAD:applications/medusa/src/__generated__/SessionCardFragment.graphql.js
// prettier-ignore
(node: any).hash = '7fe86353f01c06925816f5a505244077';
module.exports = node;
=======
(node as any).hash = 'd5268de138e39bb8fa9e752d3a78fcb0';
export default node;
>>>>>>> master:applications/medusa/src/__generated__/SessionCardFragment.graphql.ts
