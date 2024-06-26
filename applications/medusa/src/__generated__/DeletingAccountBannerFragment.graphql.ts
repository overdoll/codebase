/**
 * @generated SignedSource<<e4c3422f3c3bb09ec75ef2e19f87f065>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeletingAccountBannerFragment$data = {
  readonly deleting: {
    readonly scheduledDeletion: any;
  };
  readonly " $fragmentType": "DeletingAccountBannerFragment";
};
export type DeletingAccountBannerFragment$key = {
  readonly " $data"?: DeletingAccountBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeletingAccountBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeletingAccountBannerFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "AccountDeleting",
        "kind": "LinkedField",
        "name": "deleting",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "scheduledDeletion",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "deleting"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "59807a41dc1cc7523a968e95921bfa66";

export default node;
