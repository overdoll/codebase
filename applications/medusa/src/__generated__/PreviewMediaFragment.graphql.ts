/**
 * @generated SignedSource<<7a966fc782a3edbc76a14e951e7d24ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PreviewMediaFragment$data = {
  readonly type: ResourceType;
  readonly " $fragmentSpreads": FragmentRefs<"ControlledVideoFragment" | "ImageSnippetFragment">;
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
      "name": "type",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ImageSnippetFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ControlledVideoFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "ba77f0d2714f40428ad1a8b6debc8804";

export default node;
