/**
 * @generated SignedSource<<35026ffc605a52f1c8e73603fc48dff0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostDescriptionFragment$data = {
  readonly description: string;
  readonly " $fragmentType": "PostDescriptionFragment";
};
export type PostDescriptionFragment$key = {
  readonly " $data"?: PostDescriptionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostDescriptionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostDescriptionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "22bd10b2560b00dfb8c576341380a019";

export default node;
