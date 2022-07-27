/**
 * @generated SignedSource<<8944b3daba2ae34d9390297fb1bc6283>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostDescriptionModalFragment$data = {
  readonly club: {
    readonly id: string;
    readonly thumbnail: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"UpdatePostDescriptionFormFragment">;
  readonly " $fragmentType": "PostDescriptionModalFragment";
};
export type PostDescriptionModalFragment$key = {
  readonly " $data"?: PostDescriptionModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostDescriptionModalFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostDescriptionModalFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "thumbnail",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ResourceIconFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdatePostDescriptionFormFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "1b421953788bbea600a0e7c063fe9f36";

export default node;
