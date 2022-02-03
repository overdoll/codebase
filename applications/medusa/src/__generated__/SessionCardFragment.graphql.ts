/**
 * @generated SignedSource<<b1da51fbe68eac8c15ea54010bf55059>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SessionCardFragment$data = {
  readonly device: string;
  readonly ip: string;
  readonly location: {
    readonly city: string;
    readonly country: string;
    readonly subdivision: string;
  };
  readonly lastSeen: any;
  readonly current: boolean;
  readonly created: any;
  readonly " $fragmentSpreads": FragmentRefs<"RevokeSessionFragment">;
  readonly " $fragmentType": "SessionCardFragment";
};
export type SessionCardFragment = SessionCardFragment$data;
export type SessionCardFragment$key = {
  readonly " $data"?: SessionCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SessionCardFragment">;
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

(node as any).hash = "0c5220989bd012b501615188f435b406";

export default node;
