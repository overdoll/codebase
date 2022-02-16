/**
 * @generated SignedSource<<368003b5c500ea1bbbdc9d3425b7da91>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeAudienceThumbnailFragment$data = {
  readonly id: string;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentType": "ChangeAudienceThumbnailFragment";
};
export type ChangeAudienceThumbnailFragment = ChangeAudienceThumbnailFragment$data;
export type ChangeAudienceThumbnailFragment$key = {
  readonly " $data"?: ChangeAudienceThumbnailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceThumbnailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeAudienceThumbnailFragment",
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
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "cba8e20774d065d4528d0885c7012ced";

export default node;
