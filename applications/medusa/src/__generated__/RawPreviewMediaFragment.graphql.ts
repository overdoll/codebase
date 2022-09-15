/**
 * @generated SignedSource<<a6466dbd172569ca13c81a193af377df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RawPreviewMediaFragment$data = {
  readonly __typename: string;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewMediaFragment" | "ProcessingRawMediaFragment">;
  readonly " $fragmentType": "RawPreviewMediaFragment";
};
export type RawPreviewMediaFragment$key = {
  readonly " $data"?: RawPreviewMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RawPreviewMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RawPreviewMediaFragment",
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
          "name": "ProcessingRawMediaFragment"
        }
      ],
      "type": "RawMedia",
      "abstractKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PreviewMediaFragment"
    }
  ],
  "type": "Media",
  "abstractKey": "__isMedia"
};

(node as any).hash = "a4237a89bbb958241400ffb0d5dab58c";

export default node;
