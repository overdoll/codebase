/**
 * @generated SignedSource<<10e4965ce2cb8e7dcbbcbdcf585807ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewMediaFragment$data = {
  readonly __typename: "ImageMedia";
  readonly " $fragmentSpreads": FragmentRefs<"PreviewImageMediaFragment">;
  readonly " $fragmentType": "PreviewMediaFragment";
} | {
  readonly __typename: "VideoMedia";
  readonly " $fragmentSpreads": FragmentRefs<"PreviewVideoMediaFragment">;
  readonly " $fragmentType": "PreviewMediaFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "PreviewMediaFragment";
};
export type PreviewMediaFragment$key = {
  readonly " $data"?: PreviewMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PreviewImageMediaFragment"
        }
      ],
      "type": "ImageMedia",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PreviewVideoMediaFragment"
        }
      ],
      "type": "VideoMedia",
      "abstractKey": null
    }
  ],
  "type": "Media",
  "abstractKey": "__isMedia"
};

(node as any).hash = "31b92b5a49b4f858487243bb8e4c75ba";

export default node;
