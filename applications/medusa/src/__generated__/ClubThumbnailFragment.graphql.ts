/**
 * @generated SignedSource<<c75a1b1c0192ffd735b04e5256af1430>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubThumbnailFragment$data = {
  readonly id: string;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentType": "ClubThumbnailFragment";
};
export type ClubThumbnailFragment$key = {
  readonly " $data"?: ClubThumbnailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubThumbnailFragment",
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
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "552053c82ed19b9262a2cb1fea0d19bc";

export default node;
