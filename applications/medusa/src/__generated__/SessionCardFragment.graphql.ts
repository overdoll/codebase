/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SessionCardFragment = {
    readonly device: string;
    readonly ip: string;
    readonly location: {
        readonly city: string;
        readonly country: string;
        readonly subdivision: string;
    };
    readonly lastSeen: unknown;
    readonly current: boolean;
    readonly created: unknown;
    readonly " $fragmentRefs": FragmentRefs<"RevokeSessionFragment">;
    readonly " $refType": "SessionCardFragment";
};
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
(node as any).hash = '0c5220989bd012b501615188f435b406';
export default node;
