/**
 * @generated SignedSource<<f3212ea9ecf69887efd8f9a99a2b3299>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationProfileAlertFragment$data = {
  readonly curationProfile: {
    readonly completed: boolean;
  };
  readonly __typename: "Account";
  readonly " $fragmentType": "CurationProfileAlertFragment";
};
export type CurationProfileAlertFragment = CurationProfileAlertFragment$data;
export type CurationProfileAlertFragment$key = {
  readonly " $data"?: CurationProfileAlertFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CurationProfileAlertFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurationProfileAlertFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CurationProfile",
      "kind": "LinkedField",
      "name": "curationProfile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "completed",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "fb377850a122302a10a58dbd32a64f4a";

export default node;
