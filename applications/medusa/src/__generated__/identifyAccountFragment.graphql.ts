/**
 * @generated SignedSource<<ecf44b839529e293961a03f272d2a112>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type identifyAccountFragment$data = {
  readonly isArtist: boolean;
  readonly isModerator: boolean;
  readonly isStaff: boolean;
  readonly isWorker: boolean;
  readonly reference: string;
  readonly username: string;
  readonly " $fragmentType": "identifyAccountFragment";
};
export type identifyAccountFragment$key = {
  readonly " $data"?: identifyAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"identifyAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "identifyAccountFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isStaff",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isArtist",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isModerator",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isWorker",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "2c4e7ae9479f4d01a288894f0b416a6f";

export default node;
