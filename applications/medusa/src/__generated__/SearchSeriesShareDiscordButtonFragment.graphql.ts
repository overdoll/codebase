/**
 * @generated SignedSource<<a412dd6ad96117e767d4a01dd5d3d12e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchSeriesShareDiscordButtonFragment$data = {
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "SearchSeriesShareDiscordButtonFragment";
};
export type SearchSeriesShareDiscordButtonFragment$key = {
  readonly " $data"?: SearchSeriesShareDiscordButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchSeriesShareDiscordButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchSeriesShareDiscordButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "63ac3899f2bc424ba79160e4f632e7a2";

export default node;
