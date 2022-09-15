/**
 * @generated SignedSource<<16c029e072712ebd272f2114bd53d946>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PreviewMediaOldFragment$data = {
  readonly type: ResourceType;
  readonly " $fragmentSpreads": FragmentRefs<"ControlledVideoFragment" | "ImageSnippetFragment">;
  readonly " $fragmentType": "PreviewMediaOldFragment";
};
export type PreviewMediaOldFragment$key = {
  readonly " $data"?: PreviewMediaOldFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewMediaOldFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewMediaOldFragment",
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

(node as any).hash = "7ccfba99dceb12e36b6512ae93a7639d";

export default node;
