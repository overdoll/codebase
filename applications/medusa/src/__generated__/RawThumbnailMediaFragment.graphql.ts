/**
 * @generated SignedSource<<c091e76bd88d76e445e88774f2c863d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RawThumbnailMediaFragment$data = {
  readonly __typename: string;
  readonly " $fragmentSpreads": FragmentRefs<"ProcessingRawMediaFragment" | "ThumbnailMediaFragment">;
  readonly " $fragmentType": "RawThumbnailMediaFragment";
};
export type RawThumbnailMediaFragment$key = {
  readonly " $data"?: RawThumbnailMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RawThumbnailMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RawThumbnailMediaFragment",
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
      "name": "ThumbnailMediaFragment"
    }
  ],
  "type": "Media",
  "abstractKey": "__isMedia"
};

(node as any).hash = "7a07c1ed7071fce7c7256adeaf2f834f";

export default node;
